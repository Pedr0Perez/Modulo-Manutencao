<?php

namespace App\Controllers;

use CodeIgniter\Controller;
use CodeIgniter\HTTP\CLIRequest;
use CodeIgniter\HTTP\IncomingRequest;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use CodeIgniter\I18n\Time;
use App\Models\UserModel;
use App\Models\LogModel;
use Exception;

/**
 * Class BaseController
 *
 * BaseController provides a convenient place for loading components
 * and performing functions that are needed by all your controllers.
 * Extend this class in any new controllers:
 *     class Home extends BaseController
 *
 * For security be sure to declare any new methods as protected or private.
 */
abstract class BaseController extends Controller
{
    /**
     * Instance of the main Request object.
     *
     * @var CLIRequest|IncomingRequest
     */
    protected $request;

    /**
     * An array of helpers to be loaded automatically upon
     * class instantiation. These helpers will be available
     * to all other controllers that extend BaseController.
     *
     * @var array
     */
    protected $helpers = [];

    /**
     * Be sure to declare properties for any property fetch you initialized.
     * The creation of dynamic property is deprecated in PHP 8.2.
     */
    // protected $session;

    /**
     * @return void
     */
    public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger)
    {
        // Do Not Edit This Line
        parent::initController($request, $response, $logger);

        // Preload any models, libraries, etc, here.

        // E.g.: $this->session = \Config\Services::session();
    }



    private function descriptografarToken(string $token): object
    {
        $encrypt = \Config\Services::encrypter();
        $tokenConvertBin = hex2bin($token);
        $tokenDescriptografado = $encrypt->decrypt($tokenConvertBin);
        return json_decode($tokenDescriptografado);
    }

    protected function retornaTokenUsuarioDescriptografado()
    {
        try {
            if (!$this->request->getHeaderLine('Authorization'))
                return false;

            $token = $this->request->getHeaderLine('Authorization');

            $tokenDescriptografado = $this->descriptografarToken($token);

            $capturarDataAtual =  (new Time('now', 'America/Sao_paulo', 'en_US'))->format("Y-m-d H:i:s:ms");
            $dataToken = ($tokenDescriptografado->expire);

            if ($capturarDataAtual >= $dataToken)
                return false;

            $userModel = new UserModel();
            $query = $userModel->find($tokenDescriptografado->userId);

            if (isset($query))
                return $tokenDescriptografado;

            $this->response->setStatusCode(401);
            return false;
        } catch (Exception $e) {
            return false;
        }
    }

    protected function retornarDataHoraAtual(): string
    {
        helper('date');
        $actualDateTime = new Time('now', 'America/Sao_Paulo');
        $formatedDateTime = $actualDateTime->format('Y-m-d H:i:s');
        return $formatedDateTime;
    }

    protected function retornarArrayMensagem(string $mensagem): object
    {
        return $this->response->setJSON(["msg" => $mensagem]);
    }

    protected function registrarLog(int $operacao, int $modulo, int $userId, int $httpCodigo, ?string $descricao): void
    {
        $logModel = new LogModel();

        $data = [
            "operation" => $operacao,
            "module" => $modulo,
            "userId" => $userId,
            "httpCode" => $httpCodigo,
            "description" => $descricao
        ];

        $logModel->insert($data);
    }

    private function gerarJsonHeaderBodyErroHttp(int $erro): object
    {
        $msgs = [
            400 => "Bad request",
            401 => "Unauthorized access",
            403 => "Forbidden access",
            404 => "Item not found",
            418 => "I'm a teapot", // RFC 2324
            422 => "Unprocessable request",
            440 => "Login time-out", // Específico do Microsoft
            500 => "Internal server error",
            502 => "Bad gateway"
        ];

        $this->response->setStatusCode($erro);
        return $this->response->setJSON(["msg" => isset($msgs[$erro]) ? $msgs[$erro] : ""]);
    }

    protected function retornarErro(int $errorCode): object
    {
        return $this->gerarJsonHeaderBodyErroHttp($errorCode);
    }
}
