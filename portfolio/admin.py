from django.contrib import admin

from portfolio.models import Project


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'description', 'image', 'link']
