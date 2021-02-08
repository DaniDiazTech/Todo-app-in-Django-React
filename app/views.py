from django.shortcuts import render
from django.http import JsonResponse

# Rest framework stuff

from rest_framework.decorators import api_view
from rest_framework.response import Response

# Import task serializer

from .serializers import TaskSerializer
from .models import Task


@api_view(['GET'])
def apioverview(request):
    api_urls = {
        'list': '/task-list',
        'detail': '/task-detail/<int:pk>',
        'create': '/task-create',
        'update': '/task-update/<int:pk>',
        'delete': '/task-delete/<int:pk>',
    }
    return Response(api_urls)


@api_view(['GET'])
def tasklist(request):
    all_tasks = Task.objects.all()
    serializer = TaskSerializer(all_tasks, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def taskdetail(request, pk):
    tasks = Task.objects.get(pk=pk)
    serializer = TaskSerializer(tasks, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def taskcreate(request):
    serializer = TaskSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['POST'])
def taskupdate(request, pk):
    task = Task.objects.get(pk=pk)
    serializer = TaskSerializer(instance=task, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['DELETE'])
def taskdelete(request, pk):
    task = Task.objects.get(pk=pk)
    task.delete()
    return Response("Item successfully deleted!")
