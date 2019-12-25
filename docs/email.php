<?

$name= $_POST['name'];
$email= $_POST['email'];
$phone= $_POST['phone'];
$service= $_POST['service'];
$message= $_POST['message'];


$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
$headers .= 'De: Contacto Página Web Pinat Edo' . "\r\n" .'Responder a: oficina@pinatedo.com.ar@pinatedo.com.ar' . "\r\n";



$ToEmail = "oficina@pinatedo.com.ar";

//$ToEmail = "ortega.david.ar@gmail.com";

$ToName = "Pinat Edo S.R.L.";
$ToSubject = "Contacto desde Página Web Pinat Edo";

$EmailBody = "<table width='716' height='207>
  <tr>
    <td><font size='2' face='Arial'>Nombre: $name<br/>Email: $email<br/>Tel&eacute;fono: $phone<br/>Servicio: $service<br/>Mensaje: $message</font></td>
  </tr>
</table>";


$Message = $EmailBody;

mail($ToName." <".$ToEmail.">",$ToSubject, $Message, $headers);


Print "_root.Status=success";
