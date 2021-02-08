from django.views import View
from django.shortcuts import render
from django.urls import reverse, reverse_lazy
from django.http import HttpResponseRedirect

from django.views.generic import UpdateView, DeleteView, ListView

from .models import Task
from .forms import *

# Create your views here.
class TodoView(ListView):
    model = Task
    template_name = "app/index.html"
    context_object_name = 'tasks'

    paginate_by = 6

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["form"] = TaskForm
        return context
    

    def get_queryset(self):
        return Task.objects.filter(complete=False).order_by('-created')
    
    def post(self, request, *args, **kwargs):
        form = TaskForm(request.POST)
        if form.is_valid():
            # <process form cleaned data>
            form.save()
            return HttpResponseRedirect(reverse('todo-list'))

        return render(request, self.template_name, {'form': form})


class CompletedTodo(ListView):
    model = Task
    template_name = "app/completed.html"
    context_object_name = 'tasks'

    paginate_by = 6

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["form"] = TaskForm
        return context
    
    def get_queryset(self):
        return Task.objects.filter(complete=True).order_by('-created')
    
    def post(self, request, *args, **kwargs):
        form = TaskForm(request.POST)
        if form.is_valid():
            # <process form cleaned data>
            form.save()
            return HttpResponseRedirect(reverse('todo-list'))

        return render(request, self.template_name, {'form': form})



class TaskUpdateView(UpdateView):
    model = Task
    form_class = TaskUpdateForm
    template_name = "app/update.html"
    success_url = reverse_lazy("todo-list")

# class TaskUpdateCheckView(UpdateView):
#     model = Task
#     form_class = TaskUpdateCheckForm
#     template_name = "app/update.html"
#     success_url = reverse_lazy("todo-list")

class TaskDeleteView(DeleteView):
    model = Task
    template_name = "app/delete.html"
    success_url = reverse_lazy("todo-list")

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["task"] = Task.objects.get(pk=self.kwargs["pk"])
        return context

