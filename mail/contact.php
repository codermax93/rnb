<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $message = "";

    if (!empty($_POST['formData'])) {$message .= "" . $_POST['formData'] . "\n\n";}
    if (!empty($_POST['name'])) {$message .= "ФИО: " . $_POST['name'] . "\n\n";}
    if (!empty($_POST['phone'])) {$message .= "Контактный телефон: " . $_POST['phone'] . "\n\n";}
    if (!empty($_POST['email'])) {$message .= "E-mail: " . $_POST['email'] . "\n\n";}

    switch ($_POST['select']) {
        case 1:
            $message .= "Залог: " . 'Квартира' . "\n\n";
            break;
        case 2:
            $message .= "Залог: " . 'Апартаменты' . "\n\n";
            break;
        case 3:
            $message .= "Залог: " . 'Дом' . "\n\n";
            break;
        case 4:
            $message .= "Залог: " . 'Офис' . "\n\n";
            break;
        case 5:
            $message .= "Залог: " . 'Торговая площадь' . "\n\n";
            break;
    }

    if (!empty($_POST['inn'])) {$message .= "ИНН: " . $_POST['inn'] . "\n\n";}
    if (!empty($_POST['address'])) {$message .= "Адрес: " . $_POST['address'] . "\n\n";}
    if (!empty($_POST['square'])) {$message .= "Площадь: " . $_POST['square'] . "\n\n";}
    if (!empty($_POST['cost'])) {$message .= "Рыночная стоимость: " . $_POST['cost'] . "\n\n";}

    $utm_source = htmlspecialchars($_POST['utm_source']);
    $utm_medium = htmlspecialchars($_POST['utm_medium']);
    $utm_campaign = htmlspecialchars($_POST['utm_campaign']);
    $utm_content = htmlspecialchars($_POST['utm_content']);
    $utm_term = htmlspecialchars($_POST['utm_term']);
    
    $message .= "<strong>UTM Source: </strong> $utm_source <br />";
    $message .= "<strong>UTM Medium: </strong> $utm_medium <br />";
    $message .= "<strong>UTM Campaign: </strong> $utm_campaign <br />";
    $message .= "<strong>UTM Content: </strong> $utm_content <br />";
    $message .= "<strong>UTM Term: </strong> $utm_term <br />";


    $to = "d.kutenkova@rusnarbank.ru, p.gorbatsevich@rusnarbank.ru, a.grachev@rusnarbank.ru, smmagic.online@gmail.com";
    $subject = 'Форма Заявки';

    $headers  = "From: noreply@rusnarbank.ru\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $headers .= 'X-Mailer: PHP/' . phpversion();

    $send = mail($to, $subject, $message, $headers);

} else {
	echo 'OK';
}
?>