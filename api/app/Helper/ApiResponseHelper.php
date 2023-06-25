<?php

use Illuminate\Support\Facades\Log;
use App\Helpers\Helper;

    function errorResponse($errorMsg, $statusCode)
    {
        return response()->json([
            'result' => 0,
            'statusCode' => $statusCode,
            'message' => $errorMsg,
        ], $statusCode);
    }

    function successResponse($message, $statuscode, $data = null)
    {
        return response()->json([
            'result' => 1,
            'statusCode' => $statuscode,
            'message' => $message,
            'data' => $data
        ], $statuscode);
    }    
?>