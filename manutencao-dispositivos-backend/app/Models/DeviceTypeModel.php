<?php

namespace App\Models;

use CodeIgniter\Model;

class DeviceTypeModel extends Model
{
    protected $table = "SIS_DISP_TYPE";
    protected $primaryKey = "id";

    protected $allowedFields = ["type_disp"];
}
