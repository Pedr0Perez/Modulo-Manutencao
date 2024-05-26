<?php

namespace App\Models;

use CodeIgniter\Model;

class DeviceModel extends Model
{
    protected $table = "SIS_DISPOSITIVOS";
    protected $primaryKey = "id";

    protected $allowedFields = ["disp_type", "disp_name", "cpu", "gpu", "mb", "psu", "storage", "ram_qtd", "ram_type", "vram_qtd", "vram_type", "note"];
}
