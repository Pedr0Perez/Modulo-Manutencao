<?php

namespace App\Models;

use CodeIgniter\Model;

class VramTypeModel extends Model
{
    protected $table = "SIS_VRAM_TYPE";
    protected $primaryKey = "id";

    protected $allowedFields = ["type_name"];
}
