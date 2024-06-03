<?php

namespace App\Controllers;

use CodeIgniter\HTTP\Response;
use App\Models\MaintenanceModel;

class MaintenanceController extends BaseController
{

    private int $manutEntryCode;
    private int $deviceId;
    private string $actualDate;
    private int $userId;
    private ?string $itEnded;
    private string $description;

    private function setMaintenance(): void
    {
        $json = $this->request->getJSON();
        $this->manutEntryCode = $this->generateMaintanenceEntryCode();
        $this->deviceId = $json->deviceId;
        $this->actualDate = $this->retornarDataHoraAtual();
        $informacoesUsuario = $this->retornaTokenUsuarioDescriptografado();
        $this->userId = $informacoesUsuario->userId;
        $this->itEnded = $json->itEnded;
        $this->description = mb_strtoupper($json->description, 'UTF-8');
    }

    private function generateMaintanenceEntryCode(): int
    {
        $maintenanceModel = new MaintenanceModel();
        $query = $maintenanceModel->orderBy('manut_entry', 'DESC')->first();

        if (!isset($query["manut_entry"])) return 1;

        $ultimoCodigo = $query["manut_entry"];
        return $ultimoCodigo + 1;
    }

    public function readAllMaintenance(): object
    {
        $maintenanceModel = new MaintenanceModel();

        return $this->response->setJSON($maintenanceModel->findAll())->setStatusCode(Response::HTTP_OK);
    }

    public function readMaintenanceById(int $id): object
    {
        $maintenanceModel = new MaintenanceModel();

        $query = $maintenanceModel->find($id);

        if (!$query) return $this->retornarErro(Response::HTTP_NOT_FOUND);

        return $this->response->setJSON($maintenanceModel->find($id))->setStatusCode(Response::HTTP_OK);
    }

    public function createMaintenance(): object
    {
        $this->setMaintenance();

        $maintenanceModel = new MaintenanceModel();

        $data = [
            "manut_entry" => $this->manutEntryCode,
            "disp_id" => $this->deviceId,
            "date_create" => $this->actualDate,
            "user_id" => $this->userId,
            "it_ended" => "N",
            "description" => $this->description,
            "status" => "A",
        ];

        $maintenanceModel->insert($data);

        $id = $maintenanceModel->getInsertID();

        $manutencaoAtual = $maintenanceModel->find($id);

        if (!$manutencaoAtual) return $this->retornarErro(Response::HTTP_BAD_REQUEST);

        return $this->response->setJSON(["msg" => "Manutenção criada com sucesso.", "query" => $manutencaoAtual])->setStatusCode(Response::HTTP_CREATED);
    }

    public function updateMaintenance(int $id): object
    {
        $this->setMaintenance();

        $maintenanceModel = new MaintenanceModel();

        $data = [
            "manut_entry" => $this->manutEntryCode,
            "disp_id" => $this->deviceId,
            "date_create" => $this->actualDate,
            "user_id" => $this->userId,
            "it_ended" => "N",
            "description" => $this->description,
        ];

        $maintenanceModel->update($id, $data);

        $manutencaoAtual = $maintenanceModel->find($id);

        if (!$manutencaoAtual) return $this->retornarErro(Response::HTTP_BAD_REQUEST);

        return $this->response->setJSON(["msg" => "Manutenção atualizada com sucesso.", "query" => $manutencaoAtual])->setStatusCode(Response::HTTP_OK);
    }

    public function disableMaintenance(int $id): object
    {

        $maintenanceModel = new MaintenanceModel();

        $data = [
            "status" => "D",
        ];

        $maintenanceModel->update($id, $data);

        $manutencaoAtual = $maintenanceModel->find($id);

        if (!$manutencaoAtual) return $this->retornarErro(Response::HTTP_BAD_REQUEST);

        return $this->response->setJSON(["msg" => "Manutenção desativada com sucesso."])->setStatusCode(Response::HTTP_OK);
    }

    public function finishMaintenance(int $id): object
    {
        $maintenanceModel = new MaintenanceModel();

        $data = [
            "it_ended" => "Y",
            "date_ended" => $this->retornarDataHoraAtual()
        ];

        $maintenanceModel->update($id, $data);

        $manutencaoAtual = $maintenanceModel->find($id);

        if (!$manutencaoAtual) return $this->retornarErro(Response::HTTP_BAD_REQUEST);

        return $this->response->setJSON(["msg" => "Manutenção finalizada com sucesso."])->setStatusCode(Response::HTTP_OK);
    }
}
