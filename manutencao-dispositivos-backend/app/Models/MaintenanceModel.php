<?php

namespace App\Models;

use CodeIgniter\Model;

class MaintenanceModel extends Model
{
    protected $table = "SIS_MANUTENCOES_DISP";
    protected $primaryKey = "id";

    protected $allowedFields = ["manut_entry", "disp_id", "date_create", "date_ended", "user_id", "it_ended", "description", "status"];
}
