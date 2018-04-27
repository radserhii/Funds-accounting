@extends('layouts.app')

@section('content')
    <div id="edit-operation"
         data-id={{$operation->id}}
                 data-title={{$operation->title}}
            data-type={{$operation->type}}
                 data-sum={{$operation->sum}}
    ></div>
@endsection
