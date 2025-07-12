using Microsoft.AspNetCore.Mvc;

namespace BackEnd_Api.Attributes
{
    public class HasPermissionAttribute : TypeFilterAttribute
    {
        public HasPermissionAttribute(string permission)
            : base(typeof(HasPermissionFilter))
        {
            Arguments = new object[] { permission };
        }
    }

}
