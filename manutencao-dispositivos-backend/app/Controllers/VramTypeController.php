<?php

namespace App\Controllers;

use CodeIgniter\HTTP\Response;
use App\Models\VramTypeModel;

class VramTypeController extends BaseController
{

    private string $itemTypeDescription;

    private function setVramType()
    {
        $json = $this->request->getJSON();
        $this->itemTypeDescription = mb_strtoupper($json->itemTypeDescription, 'UTF-8');
    }

    public function readAllVramTypes()
    {
        $ramTypeModel = new VramTypeModel();

        return $this->response->setJSON($ramTypeModel->findAll())->setStatusCode(Response::HTTP_OK);
    }

    public function createVramType(): object
    {
        $this->setVramType();

        $vramTypeModel = new VramTypeModel();

        $data = [
            "type_name" => $this->itemTypeDescription
        ];

        $vramTypeModel->insert($data);

        $id = $vramTypeModel->getInsertID();

        $tipoCriado = $vramTypeModel->find($id);

        if (!$tipoCriado)
            return $this->retornarErro(Response::HTTP_BAD_REQUEST);

        return $this->response->setJSON(["msg" => "Tipo de memória RAM cadastrado com sucesso.", "query" => $tipoCriado])->setStatusCode(Response::HTTP_CREATED);
    }

    public function updateVramType(int $vramTypeId): object
    {
        $this->setVramType();

        $vramTypeModel = new VramTypeModel();

        $data = [
            "type_name" => $this->itemTypeDescription,
        ];

        $vramTypeModel->update($vramTypeId, $data);

        $ramTipoAtualizado = $vramTypeModel->find($vramTypeId);

        if (!$ramTipoAtualizado)
            return $this->retornarErro(Response::HTTP_BAD_REQUEST);

        return $this->response->setJSON(["msg" => "Tipo de memória RAM atualizado com sucesso.", "query" => $ramTipoAtualizado])->setStatusCode(Response::HTTP_OK);
    }

    public function deleteVramType(int $vramTypeId): object
    {
        $vramTypeModel = new VramTypeModel();

        $query = $vramTypeModel->find($vramTypeId);
        if (!$query)
            return $this->retornarErro(Response::HTTP_NOT_FOUND);


        $query = $vramTypeModel->delete($vramTypeId);

        return $this->response->setStatusCode(Response::HTTP_NO_CONTENT);
    }
}
