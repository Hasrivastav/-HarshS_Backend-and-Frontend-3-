import React, {   useState } from "react";
import {
  EditOutlined,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  DeleteOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import axios from "axios";
import { Modal, Form, Input, Card, Col } from "antd";
import "../style/card.scss";
// const { confirm } = Modal;

export const ExchangeCard = ({ id, name, email, phone, website, setUpdate ,exchanges,setExchanges }) => {
    const [Name,setName] = useState(name);
    const [Email, setEmail] = useState(email);
    const [Phone,setPhone] = useState(phone);
    const [Website, setWebsite] = useState(website);
   const [liked, setLiked] = useState(false);
   const [isEditModalVisible, setIsEditModalVisible] = useState(false);
   
  


  const handleEditClick = () => {
    setIsEditModalVisible(true);
  };

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  const handleDeleteClick = (id) => {
    const updatedExchanges = exchanges.filter((exchange) => exchange.id !== id);
    setExchanges(updatedExchanges);
   
  };
  
  
  const handleEditModalCancel = () => {
    setIsEditModalVisible(false);
  };

  
  const handleEditModalOk =async(id)=> {

    try {
       await axios.put(`https://bytive-backend-ujf1.onrender.com/api/v1/${id}`,
         {
            name: Name,
            email: Email,
            phone: Phone,
            website: Website, 
         },
         {
          withCredentials:true,
         })
         setIsEditModalVisible(false);
         setUpdate((update) => !update);
       
     }catch (error) {
        console.log(error)
       }
  
  };

 

  return   (
   
    <Card
      style={{ width: "100%", height: "100%" }}
      cover={
        <img
          className="card-avatar"
          alt="example"
          src={`https://avatars.dicebear.com/v2/avataaars/${id}.svg?options[mood][]=happy`}
        />
      }
      actions={[
        liked ? (
          <HeartFilled color="danger" onClick={handleLikeClick} />
        ) : (
          <HeartOutlined onClick={handleLikeClick} />
        ),
        <EditOutlined key="edit" onClick={handleEditClick} />,
        <DeleteOutlined onClick={()=>handleDeleteClick(id)} />,
      ]}
    >
      <Modal
        visible={isEditModalVisible}
        title="Edit Item"
        onCancel={handleEditModalCancel}
        onOk={()=>handleEditModalOk(id)}
       
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item
            label="Name"
            name="Name"
           
            initialValue={name}
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input value={Name} onChange={(e) => setName(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Email"
            name="Email"
            initialValue={email}
            rules={[
              {
                required: true,
                message: "Please input your emaail!",
              },
            ]}
          >
            <Input  value={Email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="Phone"
            initialValue={phone}
            rules={[
              {
                required: true,
                message: "Please input your emaail!",
              },
            ]}
          >
            <Input value={Phone} onChange={(e) => setPhone(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Website"
            name="Website"
            initialValue={website}
            rules={[
              {
                required: true,
                message: "Please input your emaail!",
              },
            ]}
          >
            <Input value={Website} onChange={(e) => setWebsite(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>

      <h3 style={{ marginTop: "2px" }}>{name}</h3>
      <Col justify="space-between" display="flex" gap="2rem" flexWrap="wrap">
        <Col>
          <MailOutlined style={{ paddingRight: "5px" }} />
          <span style={{ marginLeft: "1px" }}>{email}</span>
        </Col>
        <Col>
          <PhoneOutlined style={{ paddingRight: "5px" }} />
          <span style={{ marginLeft: "1px" }}>{phone}</span>
        </Col>
        <Col>
          <GlobalOutlined style={{ paddingRight: "5px" }} />
          <span style={{ marginLeft: "1px" }}>{`https//:${website}`}</span>
        </Col>
      </Col>
    </Card>
    
   
  ) ;
};
