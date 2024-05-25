<?php

namespace App\Models;

use CodeIgniter\Model;

class RamTypeModel extends Model
{
    protected $table = "SIS_RAM_TYPE";
    protected $primaryKey = "id";

    protected $allowedFields = ["type_name"];
}
