from rest_framework import permissions


class IsNotAuthenticated(permissions.BasePermission):
    message = "شما در حال حاضر لاگین هستید و به این بخش دسترسی ندارید."

    def has_permission(self, request, view):
        return not request.user.is_authenticated