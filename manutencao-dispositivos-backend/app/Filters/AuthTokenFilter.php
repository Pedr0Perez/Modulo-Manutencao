<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Config\Services;
use CodeIgniter\I18n\Time;
use App\Models\UserModel;
use Exception;

class AuthTokenFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null): ?object
    {
        $response = Services::response();

        $tokenDescriptografado = $this->validarToken();
        if ($tokenDescriptografado !== false && $tokenDescriptografado !== NULL)
            return NULL;

        $response->setStatusCode(ResponseInterface::HTTP_UNAUTHORIZED);
        return $response->setJSON(["msg" => "Unauthorized access"]);
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // Não é necessário fazer nada após a execução do controlador
    }


    private function descriptografarToken(string $token): ?object
    {
        try {
            $encrypt = \Config\Services::encrypter();
            $tokenConvertBin = hex2bin($token);
            $tokenDescriptografado = $encrypt->decrypt($tokenConvertBin);
            return json_decode($tokenDescriptografado);
        } catch (Exception $e) {
            return NULL;
        }
    }

    private function validarToken()
    {
        try {
            $request = Services::request();


            if (!$request->getHeaderLine('Authorization'))
                return false;

            $token = $request->getHeaderLine('Authorization');

            $tokenDescriptografado = $this->descriptografarToken($token);

            if (!$tokenDescriptografado)
                return false;

            $capturarDataAtual =  (new Time('now', 'America/Sao_paulo', 'en_US'))->format("Y-m-d H:i:s:ms");
            $dataToken = ($tokenDescriptografado->expire);

            if ($capturarDataAtual >= $dataToken)
                return false;

            $userModel = new UserModel();
            $query = $userModel->find($tokenDescriptografado->userId);

            if (isset($query))
                return true;

            return false;
        } catch (Exception $e) {
            return false;
        }
    }
}
