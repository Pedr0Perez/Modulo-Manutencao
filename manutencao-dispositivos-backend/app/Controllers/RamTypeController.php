<?php

namespace App\Controllers;

use CodeIgniter\HTTP\Response;
use App\Models\RamTypeModel;

class RamTypeController extends BaseController
{

    private string $itemTypeDescription;

    private function setDevice()
    {
        $json = $this->request->getJSON();
        $this->itemTypeDescription = mb_strtoupper($json->itemTypeDescription, 'UTF-8');
    }

    public function readAllRamTypes()
    {
        $ramTypeModel = new RamTypeModel();

        return $this->response->setJSON($ramTypeModel->findAll())->setStatusCode(Response::HTTP_OK);
    }

    public function createRamType(): object
    {
        $this->setDevice();

        $deviceModel = new RamTypeModel();

        $data = [
            "type_name" => $this->itemTypeDescription
        ];

        $deviceModel->insert($data);

        $id = $deviceModel->getInsertID();

        $dispositivoCriado = $deviceModel->find($id);

        if (!$dispositivoCriado)
            return $this->retornarErro(Response::HTTP_BAD_REQUEST);

        return $this->response->setJSON(["msg" => "Tipo de memória RAM cadastrado com sucesso.", "query" => $dispositivoCriado])->setStatusCode(Response::HTTP_CREATED);
    }

    public function updateRamType(int $ramTypeId): object
    {
        $this->setDevice();

        $ramTypeModel = new RamTypeModel();

        $data = [
            "type_name" => $this->itemTypeDescription,
        ];

        $ramTypeModel->update($ramTypeId, $data);

        $ramTipoAtualizado = $ramTypeModel->find($ramTypeId);

        if (!$ramTipoAtualizado)
            return $this->retornarErro(Response::HTTP_BAD_REQUEST);

        return $this->response->setJSON(["msg" => "Tipo de memória RAM atualizado com sucesso.", "query" => $ramTipoAtualizado])->setStatusCode(Response::HTTP_OK);
    }

    public function deleteRamType(int $ramTypeId): object
    {
        $ramTypeModel = new RamTypeModel();

        $query = $ramTypeModel->find($ramTypeId);
        if (!$query)
            return $this->retornarErro(Response::HTTP_NOT_FOUND);


        $query = $ramTypeModel->delete($ramTypeId);

        return $this->response->setStatusCode(Response::HTTP_NO_CONTENT);
    }
}
