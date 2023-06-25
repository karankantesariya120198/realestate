<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Models\Properties;
use App\Http\Requests\PropertiesRequest;
use LVR\CountryCode\Two;


class PropertiesController extends Controller
{
    public function __construct()
    {

    }

    public function index(Request $request)
    {
        try {
            DB::beginTransaction();
            $perPage = $request->input('per_page', 10);
            $page = $request->input('page', 1);
            
            Paginator::currentPageResolver(function () use ($page) {
                return $page;
            });

            $properties = Properties::paginate($perPage);
            DB::commit();
            return successResponse(
                "Properties data listed successfully",
                200,
                $properties
            );
        } catch(\Exception $e) {
            DB::rollBack();
            // Log error message
            Log::info("This is PropertiesController in index function.");
            Log::error(config('constant.api.DEFAULT_ERROR_MESSAGE'), [
                '<Message>' => $e->getMessage() . '  ' . $e->getLine(),
            ]);
            return errorResponse(
                "Whoops! Something went wrong. Please try again.",
                500
            );
        }
    }

    public function store(Request $request)
    {
        try {
            // Check validation of request parameter
            $validator = Validator::make($request->all(), [
                    'name' => 'required|max:128',
                    'real_state_type' => 'required|in:house,department,land,commercial_ground',
                    'street' => 'required|max:128',
                    'external_number' => 'required|max:12',
                    'internal_number' => 'required_if:real_state_type,department,commercial_ground|max:12',
                    'neighborhood' => 'required|max:128',
                    'city' => 'required|max:64',
                    'country' => ['required', new Two],
                    'rooms' => 'required|numeric',
                    'bathrooms' => 'required_if:real_state_type,house,commercial_ground|numeric',
                    'comments' => 'max:128'
                ],
                [
                    'name.required' => 'Please enter name',
                    'name.max' => 'Name minimum length 128 character',
                    'real_state_type.required' => 'Please select real state type',
                    'real_state_type.in' => 'Please select real state type',
                    'street.required' => 'Please enter street name',
                    'street.max' => 'Street name minimum length 128 character',
                    'external_number.required' => 'Please enter external number',
                    'external_number.max' => 'External number minimum length 12 number',
                    'internal_number.required_if' => "Internal number is required",
                    'internal_number.max' => 'Internal number minimum length 12 number',
                    'neighborhood.required' => 'Please enter neighborhood',
                    'neighborhood.max' => 'Neighborhood minimum length 12 character',
                    'city.required' => 'Please enter city',
                    'city.max' => 'City minium length 64 character',
                    'rooms.required' => 'Please enter the rooms number',
                    'rooms.numeric' => 'Enter the rooms only number',
                    'bathrooms.required_if' => 'Please enter the bathroom number',
                    'bathrooms.numeric' => 'Enter the bathrooms only number',
                    'comments.max' => 'Comments minimum length 128 character'
                ]
            );
            
            if($validator->fails()) {
                return errorResponse(
                    $validator->errors()->first(),
                    422
                );
            } else {
                DB::beginTransaction();
                // Create a new resource
                $properties = Properties::create($request->all());
                DB::commit();
                return successResponse(
                    "Properties added successfully",
                    200,
                    $properties
                );
            }
        } catch(\Exception $e) {
            DB::rollBack();
            // Log error message
            Log::info("This is PropertiesController in store function.");
            Log::error(config('constant.api.DEFAULT_ERROR_MESSAGE'), [
                '<Message>' => $e->getMessage() . '  ' . $e->getLine(),
            ]);
            return errorResponse(
                "Whoops! Something went wrong. Please try again.",
                500
            );
        }
    }

    public function show($id)
    {
        try {
            DB::beginTransaction();
            $properties = Properties::find($id);
            if (!$properties) {
                return errorResponse(
                    "Properties not found",
                    404
                );
            }
            DB::commit();
            return successResponse(
                "Properties listed successfully",
                200,
                $properties
            );
        } catch (\Exception $e) {
            DB::rollBack();
            // Log error message
            Log::info("This is PropertiesController in show function.");
            Log::error(config('constant.api.DEFAULT_ERROR_MESSAGE'), [
                '<Message>' => $e->getMessage() . '  ' . $e->getLine(),
            ]);
            return errorResponse(
                "Whoops! Something went wrong. Please try again.",
                500
            );
        }
    }

    public function update(Request $request, $id)
    {
        try {
            // Check validation of request parameter
            $validator = Validator::make($request->all(), [
                'name' => 'required|max:128',
                'real_state_type' => 'required|in:house,department,land,commercial_ground',
                'street' => 'required|max:128',
                'external_number' => 'required|max:12',
                'internal_number' => 'required_if:real_state_type,department,commercial_ground|max:12',
                'neighborhood' => 'required|max:128',
                'city' => 'required|max:64',
                'country' => ['required', new Two],
                'rooms' => 'required|numeric',
                'bathrooms' => 'required_if:real_state_type,house,commercial_ground|numeric',
                'comments' => 'required|max:128'
            ],
            [
                'name.required' => 'Please enter name',
                'name.max' => 'Name minimum length 128 character',
                'real_state_type.required' => 'Please select real state type',
                'real_state_type.in' => 'Please select real state type',
                'street.required' => 'Please enter street name',
                'street.max' => 'Street name minimum length 128 character',
                'external_number.required' => 'Please enter external number',
                'external_number.max' => 'External number minimum length 12 number',
                'internal_number.required_if' => "Internal number is required",
                'internal_number.max' => 'Internal number minimum length 12 number',
                'neighborhood.required' => 'Please enter neighborhood',
                'neighborhood.max' => 'Neighborhood minimum length 12 character',
                'city.required' => 'Please enter city',
                'city.max' => 'City minium length 64 character',
                'rooms.required' => 'Please enter the rooms number',
                'rooms.numeric' => 'Enter the rooms only number',
                'bathrooms.required_if' => 'Please enter the bathroom number',
                'bathrooms.numeric' => 'Enter the bathrooms only number',
                'comments.required' => 'Please enter comments',
                'comments.max' => 'Comments minimum length 128 character'
            ]
        );
        
        if($validator->fails()) {
            return errorResponse(
                $validator->errors()->first(),
                422
            );
        } else {
            DB::beginTransaction();
            // Update the Properties
            $properties = Properties::find($id);
            if (!$properties) {
                return errorResponse(
                    "Properties not found",
                    404
                );
            }
            $properties->update($request->all());
            DB::commit();
            return successResponse(
                "Properties saved successfully",
                200,
                $properties
            );
        }
        } catch (\Exception $e) {
            DB::rollBack();
            // Log error message
            Log::info("This is PropertiesController in update function.");
            Log::error(config('constant.api.DEFAULT_ERROR_MESSAGE'), [
                '<Message>' => $e->getMessage() . '  ' . $e->getLine(),
            ]);
            return errorResponse(
                "Whoops! Something went wrong. Please try again.",
                500
            );
        }
    }

    public function destroy($id)
    {
        try {
            DB::beginTransaction();
            // Delete the Properties
            $properties = Properties::find($id);
            if (!$properties) {
                return errorResponse(
                    "Properties not found",
                    404
                );
            }
            $properties->delete();
            DB::commit();
            return successResponse(
                "Properties deleted",
                200,
                $properties
            );
            DB::commit();
        } catch(\Exception $e) {
            DB::rollBack();
            // Log error message
            Log::info("This is PropertiesController in destroy function.");
            Log::error(config('constant.api.DEFAULT_ERROR_MESSAGE'), [
                '<Message>' => $e->getMessage() . '  ' . $e->getLine(),
            ]);
            return errorResponse(
                "Whoops! Something went wrong. Please try again.",
                500
            );
        }
    }
}
