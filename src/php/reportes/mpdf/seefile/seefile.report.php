<?php 

	setlocale(LC_MONETARY, 'en_US');
    // se incluyen los archivos necesarios para generar el reporte correctamente
    include_once '../../../conexion/Conexion.php';
    include_once '../../../messages/Messages.php';
    include_once '../../../get/class/seefile.class.php';
    include_once '../../../get/class/infoBusiness.class.php';
	include_once '../../../get/class/commentsTask.class.php';
	include_once '../../../get/class/processRequest.class.php';


    // se incluye la libreria mpdf
    require_once '../vendor/autoload.php';

    // se valida si esta definido el metodo get para traer los datos
    if(isset($_GET['id'])){
        $idfile = $_GET['id'];
    }
    // se crean los objetos File y MPDF
	$infoBusiness = new Business();
    $seefile = new File();
	$comments = new Comments();
	$processActual = new Process();
    $mpdf = new \Mpdf\Mpdf(['format' => 'A4']);

    // instancias de la clase File
    $seefile->setIdFile($idfile);
    $datosTask = $seefile->getFileTask();
	
	// instancias de la clase Business
	$datosBusiness = $infoBusiness->getInfoBusiness();
	//  instancias de la clase Comments
	$comments->setIdCommentTask($idfile);
	$commentsTask = $comments->getCommentsTask();
	// instancia de la clase proceso de la solicitud
	$processActual->setIdProcesoRequest($idfile);
	$infoProcess = $processActual->getProcessActualRequest();

	// print_r($datosTask);die();


	if($datosBusiness['phone2'] != ''){
		$phone2 = ", ". $datosBusiness['phone2'];
	}

	// header
    $html = "
		<table width='100%'>
			<tr>
				<td>
					<img src='../images/LOGO-MANAGER.jpg' width='180px'></img>				
				</td>
				<td style='text-align: right'>
					<span style='font-size: 9pt; font-family:roboto-medium;'>".$datosBusiness['name']."</span><br>
					<span style='font-size: 9pt; font-family:roboto-light;'> Nit: ".$datosBusiness['nit']."</span><br>
					<span style='font-size: 9pt; font-family:roboto-light;'>".$datosBusiness['address']."</span><br>
					<span style='font-size: 9pt; font-family:roboto-light;'>Telefono(s):". $datosBusiness['phone'] ."".$phone2."</span><br>
					<span style='font-size: 9pt; font-family:roboto-light;'>".$datosBusiness['web']."</span><br>
					<span style='font-size: 9pt; font-family:roboto-light;'>".$datosBusiness['email']."</span><br>

				</td>
			</tr>
		</table><br>
		<div style='text-align: right'>
			<span style='font-size: 10pt; font-family:roboto-medium;'>Actividad: #". $datosTask['abreviate'] . $idfile ." </span><br>
		</div>
    ";

    // body html
	$html .= "
		<div>
			<span style='font-size: 11pt; font-family:roboto-medium;'>Estatus Actividad:</span><br>";
			
			if($infoProcess['proceso_actual'] == 'Finalizado'){
				$html .= "<span style='font-size: 14pt; font-family:roboto-light; color: #4CAF50;'>" . $infoProcess['proceso_actual'] . "</span>";
			}else if($infoProcess['proceso_actual'] == 'Asignado'){
				$html .= "<span style='font-size: 14pt; font-family:roboto-light; color: #F44336;'>" . $infoProcess['proceso_actual'] . "</span>";
			}else{
				$html .= "<span style='font-size: 14pt; font-family:roboto-light; color: #FF9800;'>" . $infoProcess['proceso_actual'] . "</span>";
			}

	$html .= "
		</div>						
	";

    $html .= "
 
		<div style=''><br>
			<table width='100%' cellpadding='4'>
				<tr>
					<td style='width: 50%'>
						<span style='font-size: 11pt; font-family:roboto-medium;'>Cliente:</span>
						<span style='font-size: 11pt; font-family:roboto-light;'>".$datosTask['responsables'][0]['customer']."</span>        
					</td>
				</tr>
				<tr>
					<td style='width: 50%'>
						<span style='font-size: 11pt; font-family:roboto-medium;'>Garantia:</span>
						<span style='font-size: 11pt; font-family:roboto-light;'>".$datosTask['responsables'][0]['warranty']."</span>        
					</td>
					<td style='width: 50%;'>
						<span style='font-size: 11pt; font-family:roboto-medium'>Fecha creacion:</span>
						<span style='font-size: 11pt; font-family:roboto-light;'>".$datosTask['responsables'][0]['datecreate']."</span>        
					</td>
				</tr>
				<tr>
					<td>
						<span style='font-size: 11pt; font-family:roboto-medium;'>Tipo solicitud:</span>
						<span style='font-size: 11pt; font-family:roboto-light;'>".$datosTask['responsables'][0]['typeRequest']."</span>
					</td>
					<td>
						<span style='font-size: 11pt; font-family:roboto-medium;'>Descripcion solicitud:</span>
						<span style='font-size: 11pt; font-family:roboto-light;'>".$datosTask['responsables'][0]['descRequest']."</span>
					</td>
				</tr>
				<tr>
					<td colspan='2'>
						<span style='font-size: 11pt; font-family:roboto-medium;'>Actividad:</span>                      
						<span style='font-size: 11pt; font-family:roboto-light;'>&nbsp;".$datosTask['responsables'][0]['activity']."</span>
					</td>
				</tr>
			</table><br>
			";
				
		$html .= "
			<div>
				<span style='font-size: 11pt; font-family:roboto-medium;'>Costos:</span>
			</div>
			<table width='100%' style='margin:10px; border-collapse: collapse;' cellpadding='10'>
				<thead>
					<tr style='background-color: #eeeeee;'>
						<td>
							<span style='font-size: 11pt; font-family:roboto-medium;'>Total:</span>
						</td>
						<td>
							<span style='font-size: 11pt; font-family:roboto-medium;'>Cancelado:</span>
						</td>
						<td>
							<span style='font-size: 11pt; font-family:roboto-medium;'>Saldo:</span>
						</td>
					</tr>
				</thead>
				<tbody>
				";
					if($datosTask['responsables'][0]['total'] != 0){	
						$html .= "<tr>
							<td style='border-bottom: 0.5px solid #eeeeee'>
								<span style='font-size: 11pt; font-family:roboto-light;'>$".number_format($datosTask['responsables'][0]['total'])."</span>
							</td>
							<td style='border-bottom: 0.5px solid #eeeeee'>
								<span style='font-size: 11pt; font-family:roboto-light;'>$".number_format($datosTask['responsables'][0]['cancelado'])."</span>
							</td>
							<td style='border-bottom: 0.5px solid #eeeeee'>
								<span style='font-size: 11pt; font-family:roboto-light;'>$".number_format($datosTask['responsables'][0]['saldo'])."</span>
							</td>
						</tr>";
					}else{
						$html .= "<tr>
							<td style='border-bottom: 0.5px solid #eeeeee' colspan='3'>
								<span style='font-size: 9pt; font-family:roboto-light;'> No hay costos para esta actividad. </span>
							</td>";
					}
			$html .= "	 
				</tbody>
			</table>
			";
	
		$html .= "
			<div>
				<span style='font-size: 11pt; font-family:roboto-medium;'>Comentarios:</span>
			</div>
			<table width='100%' style='margin:10px; border-collapse: collapse;' cellpadding='10'>
				<thead>
					<tr style='background-color: #eeeeee;'>
						<td>
							<span style='font-size: 11pt; font-family:roboto-medium;'>Usuario: </span>
						</td>
						<td>
							<span style='font-size: 11pt; font-family:roboto-medium;'>Comentario: </span>
						</td>
						<td>
							<span style='font-size: 11pt; font-family:roboto-medium;'>Fecha/Hora: </span>
						</td>
					</tr>
				</thead>
				<tboby>
				";
				if(count($commentsTask['comments']) > 0){
					for($i = 0; $i < count($commentsTask['comments']); $i++){
						$html .= "
							<tr>
								<td style='border-bottom: 0.5px solid #eeeeee'>
									<span style='font-size: 9pt; font-family:roboto-light;'>". $commentsTask['comments'][$i]['nombre']."</span>							
								</td>
								<td style='border-bottom: 0.5px solid #eeeeee'>
									<span style='font-size: 9pt; font-family:roboto-light;'>". $commentsTask['comments'][$i]['comment']."</span>	
								</td>
								<td style='border-bottom: 0.5px solid #eeeeee'>
									<span style='font-size: 9pt; font-family:roboto-light;'>". $commentsTask['comments'][$i]['date']."</span>	
								</td>
							</tr>
						";
					}
				}else{

					$html .= "
							<tr>
								<td style='border-bottom: 0.5px solid #eeeeee' colspan='3'>
									<span style='font-size: 9pt; font-family:roboto-light;'> No hay comentarios para la actividad.</span>						
								</td>
							</tr>
						";
				}
	
		$html .= "
				</tboby>
			</table>
		";

		$html .= "			
			<div align='right'>
				<span style='font-size: 11pt; font-family:roboto-medium;'>Costos totales:</span><br>
				<span style='font-size: 14pt; font-family:roboto-light;'>$".number_format($datosTask['responsables'][0]['total'])."</span>
			</div>
		";

    // $mpdf->SetHeader('Document Title|Center Text|{PAGENO}');
    $mpdf->WriteHTML($html);
	$mpdf->SetHTMLFooter('
		<table width="100%">
			<tr>
				<td style="font-size: 9pt; font-family:roboto-medium;">
					________________________________ <br>
					Realizado
				</td>
				<td style="font-size: 9pt; font-family:roboto-medium;">
					________________________________ <br>
					Supervisado
				</td>
				<td style="font-size: 9pt; font-family:roboto-medium;">
					
					________________________________ <br>
					Auditado
				</td>
			</tr>
			<tr>
			</tr>
		</table>
		<br>
		<table width="100%" style="border-collapse: collapse;">
			<tr>
				<td width="33%" align="left" style="font-size: 9pt; border-top: 1px solid #cfcfcf">
					Desarrollado por: <a href="https://www.agenciamanager.com" target="_blank"></b>agencia manager</a>
				</td>
				<td width="33%" align="center" style="font-size: 9pt; border-top: 1px solid #cfcfcf">
					{DATE j-m-Y}
				</td>
				<td width="33%" align="right" style="font-size: 9pt; border-top: 1px solid #cfcfcf">
					{PAGENO}/{nbpg}
				</td>
			</tr>
		</table>');

    
    $mpdf->Output();


?>