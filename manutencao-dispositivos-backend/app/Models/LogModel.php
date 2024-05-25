<?php

namespace App\Models;

use CodeIgniter\Model;

class LogModel extends Model
{
    protected $table = "SIS_OPLOG";
    protected $primaryKey = "id";

    protected $allowedFields = ['operation', 'module', 'userId', 'httpCode', 'description'];
}
