export const Home = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-beetwen p-4">
      <div className="mb-8">
      <div className="w-full max-w-4xl mb-8">
  <img 
    src="/manageTeacher.jpg" 
    alt="Manage Teacher" 
    className="w-full rounded-lg shadow-lg"
  />
</div>
      </div>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-black">MANAGE TEACHER</h1>
        <button className="text-black" >SEE MORE</button>
      </div>
    </div>
  );
};