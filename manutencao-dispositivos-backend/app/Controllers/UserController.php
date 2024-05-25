<?php

namespace App\Controllers;

use App\Models\UserModel;
use CodeIgniter\HTTP\Response;

class UserController extends BaseController
{

    private string $name;
    private string $lastname;
    private string $email;
    private ?string $email2;
    private string $password;
    private string $birth_date;
    private string $gender;
    private string $country;
    private string $city;
    private string $state;

    private function setUser()
    {
        $json = $this->request->getJSON();

        $this->name = $json->firstName;
        $this->lastname = $json->lastName;
        $this->email = $json->email;
        $this->email2 = $json->email2;
        $this->password = isset($json->password) ? $json->password : "";
        $this->birth_date = $json->birthDate;
        $this->gender = $json->gender;
        $this->country = $json->country;
        $this->city = $json->city;
        $this->state = $json->state;
    }

    public function readAllUsers(): object
    {
        $userModel = new UserModel();
        return $this->response->setJSON($userModel->select(['id', 'firstName', 'lastName', 'mail', 'mail2', 'birthDate', 'gender', 'country', 'city', 'state'])->findAll())->setStatusCode(Response::HTTP_OK);
    }

    public function readUserById(int $userId): object
    {
        $userModel = new UserModel();

        $query = $userModel->find($userId);
        if (!$query)
            return $this->retornarErro(Response::HTTP_NOT_FOUND);

        return $this->response->setJSON($userModel->select(['id', 'firstName', 'lastName', 'mail', 'mail2', 'birthDate', 'gender', 'country', 'city', 'state'])->find($userId))->setStatusCode(Response::HTTP_OK);
    }

    public function createUser(): object
    {
        $this->setUser();

        $userModel = new UserModel();

        $data = [
            "firstName" => $this->name,
            "lastName" => $this->lastname,
            "mail" => $this->email,
            "mail2" => $this->email2,
            "password" => password_hash($this->password, PASSWORD_DEFAULT),
            "birthDate" => $this->birth_date,
            "gender" => $this->gender,
            "country" => $this->country,
            "city" => $this->city,
            "state" => $this->state
        ];

        $userModel->insert($data);

        $id = $userModel->getInsertID();

        $usuarioCriado = $userModel->find($id);

        if (!$usuarioCriado)
            $this->retornarErro(Response::HTTP_OK);

        return $this->response->setJSON(["msg" => "Usuário cadastrado com sucesso.", "user" => $usuarioCriado])->setStatusCode(Response::HTTP_CREATED);
    }

    public function updateUser(int $userId): object
    {
        $this->setUser();

        $userModel = new UserModel();

        $data = [
            "firstName" => $this->name,
            "lastName" => $this->lastname,
            "mail" => $this->email,
            "mail2" => $this->email2,
            "birthDate" => $this->birth_date,
            "gender" => $this->gender,
            "country" => $this->country,
            "city" => $this->city,
            "state" => $this->state
        ];

        $userModel->update($userId, $data);

        $usuarioAtualizado = $userModel->find($userId);

        return $this->response->setJSON(["msg" => "Usuário atualizado com sucesso.", "user" => $usuarioAtualizado])->setStatusCode(Response::HTTP_OK);
    }

    public function deleteUser(int $userId): object
    {
        $userModel = new UserModel();

        $usuarioApagar = $userModel->find($userId);

        if (!$usuarioApagar)
            return $this->retornarErro(Response::HTTP_NOT_FOUND);


        $userModel->delete($userId);

        return $this->response->setStatusCode(Response::HTTP_NO_CONTENT);
    }
}
