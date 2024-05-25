<?php

namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model
{
    protected $table = 'SIS_USERS';
    protected $primaryKey = 'id';

    protected $allowedFields = ['firstName', 'lastName', 'mail', 'mail2', 'password', 'birthDate', 'gender', 'country', 'city', 'state'];
    
}
