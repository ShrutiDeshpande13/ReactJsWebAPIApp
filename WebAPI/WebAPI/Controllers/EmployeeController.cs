using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;
using System.Data.SqlClient;
using System.Configuration; 

namespace WebAPI.Controllers
{
    public class EmployeeController : ApiController
    {
        public HttpResponseMessage Get()
        {
            DataTable dt = new DataTable();
            string query = @"
                select EmployeeID, EmployeeName, Department, MailId, convert(varchar(10), DOJ,120) as DOJ from dbo.Employees
            ";
            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(dt);
            }

            return Request.CreateResponse(HttpStatusCode.OK, dt);
        }
        public string Post(Employee emp)
        {
            try
            {
                DataTable table = new DataTable();
                string query = @"
                insert into dbo.Employees(EmployeeName,
                Department,
                MailId,
                DOJ) Values(
                ' "+ emp.EmployeeName + @"'
                ,' "+ emp.Department + @"'
                ,' " + emp.MailID + @"'
                ,' " + emp.DOJ + @"'
            )";
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                return "Added Successfully";
            }
            catch (Exception)
            {
                return "Failed to add";
            }
        }
        public string Put(Employee emp)
        {
            try
            {
                DataTable table = new DataTable();
                string query = @"
                update dbo.Employees set
                EmployeeName= '" + emp.EmployeeName + @"',
                Department= '" + emp.Department + @"',
                MailId= '" + emp.MailID+ @"',
                DOJ= '" + emp.DOJ + @"'
                where EmployeeId=" + emp.EmployeeID + @"
                ";
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                return "Update Successfully";
            }
            catch (Exception)
            {
                return "Failed to Update";
            }
        }
        public string Delete(Employee emp)
        {
            try
            {
                DataTable table = new DataTable();
                string query = @"
                delete from dbo.Employees where EmployeeId=" + emp.EmployeeID + @"
                ";
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                return "Deleted Successfully";
            }
            catch (Exception)
            {
                return "Failed to Delete";
            }
        }
    }
}
