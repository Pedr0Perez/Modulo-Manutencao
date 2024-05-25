<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Config\Services;
use CodeIgniter\I18n\Time;
use App\Models\UserModel;
use Exception;

class CorsFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        // header('Access-Control-Allow-Origin: *');
        // header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
        // header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
        // header('Content-Type: application/json');
        // $method = $_SERVER['REQUEST_METHOD'];
        // if ($method == "OPTIONS") {
        //     header('Access-Control-Allow-Origin: *');
        //     header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
        //     header("HTTP/1.1 200 OK");
        //     die();
        // }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // Não é necessário fazer nada após a execução do controlador
    }
}
