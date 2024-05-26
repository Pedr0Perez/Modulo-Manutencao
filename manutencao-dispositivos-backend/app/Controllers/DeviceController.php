<?php

namespace App\Controllers;

use App\Models\DeviceModel;
use App\Models\DeviceTypeModel;
use CodeIgniter\HTTP\Response;

class DeviceController extends BaseController
{
    private int $dispType;
    private string $dispName;
    private ?string $cpu;
    private ?string $gpu;
    private ?string $motherBoard;
    private ?string $psu;
    private ?float $storage;
    private ?float $ramQuantity;
    private ?int $ramType;
    private ?float $vramQuantity;
    private ?int $vramType;
    private ?string $note;

    private function setDevice()
    {
        $json = $this->request->getJSON();

        $this->dispType = $json->dispType;
        $this->dispName = $json->dispName;
        $this->cpu = $json->cpu;
        $this->gpu = $json->gpu;
        $this->motherBoard = $json->motherboard;
        $this->psu = $json->psu;
        $this->storage = $json->storage;
        $this->ramQuantity = $json->ramQuantity;
        $this->ramType = $json->ramType;
        $this->vramQuantity = $json->vramQuantity;
        $this->vramType = $json->vramType;
        $this->note = $json->note;
    }

    public function readAllDevices(): array | object
    {
        $deviceModel = new DeviceModel();

        return $this->response->setJSON($deviceModel->findAll())->setStatusCode(Response::HTTP_OK);
    }

    public function readDeviceById(int $deviceId): object
    {
        $deviceModel = new DeviceModel();

        $query = $deviceModel->find($deviceId);

        if (!$query)
            return $this->retornarErro(Response::HTTP_NOT_FOUND);

        return $this->response->setJSON($deviceModel->find($deviceId))->setStatusCode(Response::HTTP_OK);
    }

    public function createDevice(): object
    {
        $this->setDevice();

        $deviceModel = new DeviceModel();

        $data = [
            "disp_type" => $this->dispType,
            "disp_name" => $this->dispName,
            "cpu" => $this->cpu,
            "gpu" => $this->gpu,
            "mb" => $this->motherBoard,
            "psu" => $this->psu,
            "storage" => $this->storage,
            "ram_qtd" => $this->ramQuantity,
            "ram_type" => $this->ramType,
            "vram_qtd" => $this->vramQuantity,
            "vram_type" => $this->vramType,
            "note" => $this->note
        ];

        $deviceModel->insert($data);

        $id = $deviceModel->getInsertID();

        $dispositivoCriado = $deviceModel->find($id);

        if (!$dispositivoCriado)
            return $this->retornarErro(Response::HTTP_BAD_REQUEST);

        return $this->response->setJSON(["msg" => "Dispositivo cadastrado com sucesso.", "query" => $dispositivoCriado])->setStatusCode(Response::HTTP_CREATED);
    }

    public function updateDevice(int $dispId): object
    {
        $this->setDevice();

        $deviceModel = new DeviceModel();

        $data = [
            "disp_type" => $this->dispType,
            "disp_name" => $this->dispName,
            "cpu" => $this->cpu,
            "gpu" => $this->gpu,
            "mb" => $this->motherBoard,
            "psu" => $this->psu,
            "storage" => $this->storage,
            "ram_qtd" => $this->ramQuantity,
            "ram_type" => $this->ramType,
            "vram_qtd" => $this->vramQuantity,
            "vram_type" => $this->vramType,
            "note" => $this->note
        ];

        $deviceModel->update($dispId, $data);

        $dispositivoAtualizado = $deviceModel->find($dispId);

        if (!$dispositivoAtualizado)
            return $this->retornarErro(Response::HTTP_BAD_REQUEST);

        return $this->response->setJSON(["msg" => "Dispositivo atualizado com sucesso.", "query" => $dispositivoAtualizado])->setStatusCode(Response::HTTP_OK);
    }

    public function deleteDevice(int $deviceId): object
    {
        $deviceModel = new DeviceModel();

        $query = $deviceModel->find($deviceId);
        if (!$query)
            return $this->retornarErro(Response::HTTP_NOT_FOUND);


        $query = $deviceModel->delete($deviceId);

        return $this->response->setStatusCode(Response::HTTP_NO_CONTENT);
    }
}
