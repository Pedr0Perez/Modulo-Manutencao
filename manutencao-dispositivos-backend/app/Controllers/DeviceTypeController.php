<?php

namespace App\Controllers;

use CodeIgniter\HTTP\Response;
use App\Models\DeviceTypeModel;

class DeviceTypeController extends BaseController
{

    private string $itemTypeDescription;

    private function setDevice()
    {
        $json = $this->request->getJSON();
        $this->itemTypeDescription = $json->itemTypeDescription;
    }

    public function readAllTypesDevices()
    {
        $deviceTypeModel = new DeviceTypeModel();

        return $this->response->setJSON($deviceTypeModel->findAll())->setStatusCode(Response::HTTP_OK);
    }

    public function createTypeDevice(): object
    {
        $this->setDevice();

        $deviceModel = new DeviceTypeModel();

        $data = [
            "type_disp" => $this->itemTypeDescription
        ];

        $deviceModel->insert($data);

        $id = $deviceModel->getInsertID();

        $dispositivoCriado = $deviceModel->find($id);

        if (!$dispositivoCriado)
            return $this->retornarErro(Response::HTTP_BAD_REQUEST);

        return $this->response->setJSON(["msg" => "Tipo de dispositivo cadastrado com sucesso.", "query" => $dispositivoCriado])->setStatusCode(Response::HTTP_CREATED);
    }

    public function updateTypeDevice(int $dispTypeId): object
    {
        $this->setDevice();

        $deviceTypeModel = new DeviceTypeModel();

        $data = [
            "type_disp" => $this->itemTypeDescription,
        ];

        $deviceTypeModel->update($dispTypeId, $data);

        $dispositivoTipoAtualizado = $deviceTypeModel->find($dispTypeId);

        if (!$dispositivoTipoAtualizado)
            return $this->retornarErro(Response::HTTP_BAD_REQUEST);

        return $this->response->setJSON(["msg" => "Tipo de dispositivo atualizado com sucesso.", "query" => $dispositivoTipoAtualizado])->setStatusCode(Response::HTTP_OK);
    }

    public function deleteTypeDevice(int $deviceTypeId): object
    {
        $deviceTypeModel = new DeviceTypeModel();

        $query = $deviceTypeModel->find($deviceTypeId);
        if (!$query)
            return $this->retornarErro(Response::HTTP_NOT_FOUND);


        $query = $deviceTypeModel->delete($deviceTypeId);

        return $this->response->setStatusCode(Response::HTTP_NO_CONTENT);
    }
}
