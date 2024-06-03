<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

//Módulo inicial
$routes->get('/', 'Home::index');

//Módulo de autenticação de usuários
$routes->post('/login/auth', 'AuthController::index');

$routes->get('/manutencoes', 'MaintenanceController::readAllMaintenance');
$routes->get('/manutencoes/(:num)', 'MaintenanceController::readMaintenanceById/$1');
$routes->post('/manutencoes/abrir', 'MaintenanceController::createMaintenance');
$routes->patch('/manutencoes/atualizar/(:num)', 'MaintenanceController::updateMaintenance/$1');
$routes->get('/manutencoes/desativar/(:num)', 'MaintenanceController::disableMaintenance/$1');
$routes->get('/manutencoes/finalizar/(:num)', 'MaintenanceController::finishMaintenance/$1');

//Módulo de usuários
$routes->get('/usuarios', 'UserController::readAllUsers'); //Retorna a lista de todos usuários cadastrados
$routes->get('/usuarios/(:num)', 'UserController::readUserById/$1'); //Realiza a l
$routes->post('/usuarios/cadastrarusuario', 'UserController::createUser'); //Realiza o cadastro de um usuário
$routes->put('/usuarios/atualizarusuario/(:num)', 'UserController::updateUser/$1'); //Realiza a atualização de um usuário
$routes->delete('/usuarios/deletarusuario/(:num)', 'UserController::deleteUser/$1'); //Realiza a exclusão de um usuário

//Módulo de dispositivos
$routes->get('/dispositivos', 'DeviceController::readAllDevices');
$routes->get('/dispositivos/(:num)', 'DeviceController::readDeviceById/$1');
$routes->post('/dispositivos/cadastrar', 'DeviceController::createDevice');
$routes->put('/dispositivos/atualizar/(:num)', 'DeviceController::updateDevice/$1');
$routes->delete('/dispositivos/deletar/(:num)', 'DeviceController::deleteDevice/$1');
//Módulo de dispositivos: tipos de dispositivos
$routes->get('/dispositivos/tipos', 'DeviceTypeController::readAllTypesDevices'); //Tipos de dispositivos
$routes->post('/dispositivos/tipos/cadastrar', 'DeviceTypeController::createTypeDevice');
$routes->put('/dispositivos/tipos/atualizar/(:num)', 'DeviceTypeController::updateTypeDevice/$1');
$routes->delete('/dispositivos/tipos/deletar/(:num)', 'DeviceTypeController::deleteTypeDevice/$1');

//Módulo de cadastro de tipos de memória RAM
$routes->get('/ram/tipos', 'RamTypeController::readAllRamTypes');
$routes->post('/ram/tipos/cadastrar', 'RamTypeController::createRamType');
$routes->put('/ram/tipos/atualizar/(:num)', 'RamTypeController::updateRamType/$1');
$routes->delete('/ram/tipos/deletar/(:num)', 'RamTypeController::deleteRamType/$1');

//Módulo de cadastro de tipos de memória VRAM
$routes->get('/vram/tipos', 'VramTypeController::readAllVramTypes');
$routes->post('/vram/tipos/cadastrar', 'VramTypeController::createVramType');
$routes->put('/vram/tipos/atualizar/(:num)', 'VramTypeController::updateVramType/$1');
$routes->delete('/vram/tipos/deletar/(:num)', 'VramTypeController::deleteVramType/$1');
