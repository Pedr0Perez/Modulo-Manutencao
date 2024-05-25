<?php

namespace App\Controllers;

use App\Models\UserModel;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\I18n\Time;

class AuthController extends BaseController
{
    private int $userId;
    private string $nome;
    private string $sobrenome;

    public function index(): object
    {
        $json = $this->request->getJSON();
        $emailRecebido = $json->email;
        $senhaRecebida = $json->senha;

        if ($this->validarUsuario($emailRecebido, $senhaRecebida)) {

            $encrypt = \Config\Services::encrypter();

            $dataAtual =  new Time('now', 'America/Sao_paulo', 'en_US');

            $dataExpiracao = ($dataAtual->addHours(4))->format("Y-m-d H:i:s:ms");

            $dadosToken = [
                "userId" => $this->userId,
                "email" => $emailRecebido,
                "expire" => $dataExpiracao
            ];

            $dadosCriptografados = $encrypt->encrypt(json_encode($dadosToken));

            $token = bin2hex($dadosCriptografados);

            $this->response->setStatusCode(ResponseInterface::HTTP_OK);
            return $this->response->setJSON(
                [
                    "email" => $emailRecebido,
                    "allName" => $this->nome . " " . $this->sobrenome,
                    "nome" => $this->nome,
                    "date_expire" => $dataExpiracao,
                    "token" => $token
                ]
            );
        }

        $this->response->setStatusCode(ResponseInterface::HTTP_UNAUTHORIZED);
        return $this->response->setJSON(["msg" => "Acesso não autorizado."]);
    }

    private function validarUsuario(string $email, string $senha): bool
    {
        $userModel = new UserModel();
        $query = $userModel->where('mail', $email)->get();
        $request = isset($query->getResult()[0]) ? $query->getResult()[0] : NULL;

        if (!$request)
            return false;

        $this->setInformacaoUsuario($request);

        $senhaUser = $request->password;

        if (password_verify($senha, $senhaUser)) {
            return true;
        }

        return false;
    }

    private function setInformacaoUsuario(object $request): void
    {
        $this->userId = $request->id;
        $this->nome = $request->firstName;
        $this->sobrenome = $request->lastName;
    }
}
