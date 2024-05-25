<?php

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Config\Services;
use CodeIgniter\I18n\Time;
use DateTime;
use App\Models\UserModel;

if (!function_exists('validarToken')) {


    function descriptografarToken(string $token): object
    {
        $encrypt = \Config\Services::encrypter();
        $tokenConvertBin = hex2bin($token);
        $tokenDescriptografado = $encrypt->decrypt($tokenConvertBin);
        return json_decode($tokenDescriptografado);
    }

    function validarToken()
    {
        $request = Services::request();
        $response = Services::response();


        if (!$request->getHeaderLine('Authorization'))
            return false;

        $token = $request->getHeaderLine('Authorization');

        $tokenDescriptografado = descriptografarToken($token);

        $capturarDataAtual =  (new Time('now', 'America/Sao_paulo', 'en_US'))->format("Y-m-d H:i:s:ms");
        $dataToken = ($tokenDescriptografado->expire);

        if ($capturarDataAtual >= $dataToken)
            return false;

        $userModel = new UserModel();
        $query = $userModel->find($tokenDescriptografado->userId);

        if (isset($query))
            return $tokenDescriptografado;

        $response->setStatusCode(401);
        return false;
    }
}
