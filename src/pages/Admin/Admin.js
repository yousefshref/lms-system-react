import { Progress } from "antd";
import AdminDefault from "../../components/Layouts/AdminDefault";

const Admin = () => {
  return (
    <AdminDefault width={true}>
      <div className="p-5 rounded-xl flex flex-wrap gap-6 justify-around">
        <div className="w-full flex flex-col h-[250px] justify-center items-center gap-5 max-w-sm p-3 rounded-xl from-red-200 to-orange-100 bg-gradient-to-br shadow-xl shadow-indigo-100">
          <b>مستوي جميع الفصول في الامتحانات</b>
          <Progress type="circle" percent={75} />
        </div>
        <div className="w-full flex flex-col h-[250px] justify-center items-center gap-5 max-w-sm p-3 rounded-xl from-red-200 to-orange-100 bg-gradient-to-br shadow-xl shadow-indigo-100">
          <b>مستوي جميع الفصول في الامتحانات</b>
          <Progress type="circle" percent={75} />
        </div>
        <div className="w-full flex flex-col h-[250px] justify-center items-center gap-5 max-w-sm p-3 rounded-xl from-red-200 to-orange-100 bg-gradient-to-br shadow-xl shadow-indigo-100">
          <b>مستوي جميع الفصول في الامتحانات</b>
          <Progress type="circle" percent={75} />
        </div>
        <div className="w-full flex flex-col h-[250px] justify-center items-center gap-5 max-w-sm p-3 rounded-xl from-red-200 to-orange-100 bg-gradient-to-br shadow-xl shadow-indigo-100">
          <b>مستوي جميع الفصول في الامتحانات</b>
          <Progress type="circle" percent={75} />
        </div>
      </div>

      <hr className="my-4 py-0.5 bg-indigo-200" />

      <div className="flex md:flex-row flex-col gap-5 justify-between w-full">
        <div className="md:w-1/2 flex flex-col gap-2">
          <b>حالات المدرسين اليوم</b>
          <hr />
          <div className="flex flex-col gap-4">
            <table className="w-full table-zinc-600 text-start items-center">
              <thead className="bg-zinc-300">
                <tr>
                  <th className="text-start p-2">اسم المدرس</th>
                  <th className="text-start p-2">الحالة</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-indigo-100 p-2 transition-all hover:bg-indigo-300 cursor-pointer">
                  <td>احمد محمد احمد</td>
                  <td className="text-red-600">غائب</td>
                </tr>
                <tr className="bg-indigo-100 p-2 transition-all hover:bg-indigo-300 cursor-pointer">
                  <td>احمد محمد احمد</td>
                  <td className="text-green-600">حاضر</td>
                </tr>
                <tr className="bg-indigo-100 p-2 transition-all hover:bg-indigo-300 cursor-pointer">
                  <td>احمد محمد احمد</td>
                  <td className="text-red-600">غائب</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="md:w-1/2 flex flex-col gap-2">
          <b>الشكاوي والملاحظات</b>
          <hr />
          <div className="flex flex-col gap-4">
            <table className="w-full table-zinc-600 text-start items-center">
              <thead className="bg-zinc-300">
                <tr>
                  <th className="text-start p-2">من</th>
                  <th className="text-start p-2">الموضوع</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-indigo-100 p-2 transition-all hover:bg-indigo-300 cursor-pointer">
                  <td>والدة سارة</td>
                  <td>مشاكل في فصل ابنتي</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminDefault>
  );
};

export default Admin;
