import { useAppContext } from "../../context/AppContext";
import { useEffect, useState } from "react";
import { Table } from "../../components/Tables/Table";
import { Button } from "../../components/UI/Button";
import { Table as TableSkeleton } from "../../components/Skeletons/Table";
import { Input } from "../../components/UI/Input";
import { createSecret, getSecrets } from "../../services/secretsServices";
import { errors } from "../../constants/Errors";
import { Select } from "../../components/UI/Select";
import { Notification } from "../../components/UI/Notification";
export const SecretKeys = () => {
  const { isMenuOpen } = useAppContext();
  const [errorMessage,setErrorMessage] = useState('');
  const [loading,setLoading] = useState(false);
  const [secrets,setSecrets] = useState(false);
  const [pagination,setPagination] = useState({})
  const [paginate,setPaginate] = useState(false);
  const [formData,setFormData] = useState({})
  const [notification,setNotification] = useState(null);
  const [sendLoading,setSendLoading] = useState(false)
    
  const handleChange = (e) =>{
    const {name,value} = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name] : value
    }))
  }
    
  const getSecrets_FUNCTION = async (page) => {
      setLoading(true);
      const response = await getSecrets(localStorage.getItem("token"), page);
      setLoading(false);
      setPaginate(true);

      response.data.secrets.data.length === 0 && setErrorMessage(errors.notFound)
      setPagination({
        currentPage: response.data.secrets.current_page,
        lastPage: response.data.secrets.last_page,
        total: response.data.secrets.total,
      });
      
      if (response.data.secrets.data) {
        setSecrets(response.data.secrets.data);
      }
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setSendLoading(true);
        setNotification(null);
        try {
            const response = await createSecret(localStorage.getItem('token'),formData);
            setSendLoading(false);
    
            if(response.status === 200){
                setNotification({type:"success",message:response.data.message})
            }

            console.log(response);
            

        }catch (error) {            
            setSendLoading(false);
            if(error.response){
                setNotification({type:'error',message:error.response.data.message})
            }else{
                setNotification({type:'error',message:errors.tryAgain})
            }
        }
    }

    useEffect(() =>{
        getSecrets_FUNCTION(1);
    },[])
  return (
    !isMenuOpen && (
      <div className={`ml-6 mt-6 w-[85%]`}>
        <div className="w-[100%] px-2">
          <h1 className="text-3xl font-semibold">Secret Keys</h1>
          <br></br>
          <form onSubmit={handleSubmit}>
            <div className="sm:flex block justify-between w-[100%]">
                <div className="sm:flex flex-row gap-2 block w-[70%]">
                    <Input
                        type={"text"}
                        placholder={"Ex: SOF1DEV002"}
                        border={"white"}
                        name={'secretKey'}
                        value={formData.secretKey}
                        onChange={handleChange}
                    />
                    <Select title={'Expires At (days)'} bg={'black'}
                    value={formData.expiresAt}
                    name={'expiresAt'}
                    onchange={handleChange}
                    options={[2,5,10,20,30]}/>
                </div>
                <div>
                    <Button
                        text={"Add secret Key"}
                        width={"20%"}
                        loading={sendLoading}
                    />
                </div>
            </div>
          </form>
        </div>
        <div className="mt-4 px-2">
          {errorMessage && (
            <span className="text-red-300 text-xl font-semibold">
              {errorMessage}
            </span>
          )}
          {loading && <TableSkeleton />}
          {secrets && secrets.length && !loading ? (
            <Table
              heads={["Secret", "Creator" , "Expires in"]}
              data={secrets}
              deleteButton={true}
              keys={["secretKey", "admin.full_name", "expires_at"]}
              pagination={pagination}
              paginate={paginate}
              getData={getSecrets_FUNCTION}
              toUpdateOrDelete={"Secret"}
            />
          ) : null}
          {
            notification && <Notification type={notification.type} message={notification.message} />
          }
        </div>
      </div>
    )
  );
};
