<?php 

header('Content-Type: application/json'); //Заголовок запроса

$name = $_POST['username'];
//$street = $_POST['adress-street']:
//$house = $_POST['adress-house'];

//echo $name;
$message = "Сообщение от пользователя: $name";

//$result Возвращает true, если соообщение отправилось, false - если не отправилось
if ($name == '') {
	$result == false;
} else {
	$result = mail('pink_panter1985@mail.ru', 'Тема письма', $message);
};



echo json_encode(array(
	'status' => $result
));

?>
