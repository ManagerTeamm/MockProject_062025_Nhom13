using BackEnd_Api.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace BackEnd_Api.Attributes
{
    public class HasPermissionFilter : IAsyncAuthorizationFilter
    {
        private readonly string _permission;
        private readonly IUserRepository _userRepo;

        public HasPermissionFilter(string permission, IUserRepository userRepo)
        {
            _permission = permission;
            _userRepo = userRepo;
        }

        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
            var userPermissions = _userRepo.GetPermissions();
            if (!userPermissions.Contains(_permission))
            {
                context.Result = new ForbidResult("You do not have permission to perform this action.");
            }
        }
    }

}
