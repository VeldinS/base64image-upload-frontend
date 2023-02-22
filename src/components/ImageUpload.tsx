import React, { useState } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css';
import './imageUpload.css';

import image1 from './images/image1.jpg';

const ImageUpload: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        country: '',
        text: '',
        image: '',
    }), [imageBase64, setImageBase64] = useState(''), handleImageChange = (e: any) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImageBase64(reader.result as string);
        };
    }, handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    }, handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newUpload = {
            name: formData.name,
            location: formData.location,
            country: formData.country,
            text: formData.text,
            image: imageBase64,
        };

        console.log(newUpload)

        const response = await axios.post(
            'http://localhost:5000/',
            newUpload,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        alert('SUCCESS');
    };


    return (
        <div
            className={'addActivity-page-main'}
            style={{
                minHeight: '100vh',
                backgroundImage: `linear-gradient(rgba(0,0,0,.8), rgba(0,0,0,.6)), url(${image1})`,
                backgroundSize: 'cover',
                height: 'max-content',
            }}
        >
            <div className={'row'}>
                <div className={'col-8 form-pt-1'}>
                    <form onSubmit={handleSubmit} className={'text-center addActivity-form'}>
                        <div className='mb-3 addActivity-form1'>
                            <label htmlFor='exampleInputEmail1' className='form-label'>
                                INPUT FIELD 1
                            </label>
                            <input
                                type='text'
                                name={'name'}
                                value={formData.name}
                                onChange={handleChange}
                                className='form-control'
                                id='exampleInputEmail1'
                                aria-describedby='emailHelp'
                            />
                        </div>
                        <div className='mb-3 addActivity-form1'>
                            <label htmlFor='exampleInputEmail1' className='form-label'>
                                INPUT FIELD 2
                            </label>
                            <input
                                type='text'
                                name={'location'}
                                value={formData.location}
                                onChange={handleChange}
                                className='form-control'
                                id='exampleInputPassword1'
                            />
                        </div>
                        <div className='mb-3 addActivity-form1'>
                            <label htmlFor='exampleInputEmail1' className='form-label'>
                                INPUT FIELD 3
                            </label>
                            <input
                                type='text'
                                name={'country'}
                                value={formData.country}
                                onChange={handleChange}
                                className='form-control'
                                id='exampleInputPassword1'
                            />
                        </div>
                        <div className="mb-3 addActivity-form1">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                INPUT FIELD 4
                            </label>
                            <input
                                type="text"
                                name={'text'}
                                value={formData.text}
                                onChange={handleChange}
                                className="form-control addActivity-form2"
                                id="exampleInputPassword1"/>
                        </div>
                    </form>
                </div>
                <div className={"col-4 form-pt-2"}>
                    <form onSubmit={handleSubmit} >
                        <div className={"addActivity-form3"}>
                            <p>UPLOAD IMAGE</p>
                            <input name={'image'} type={"file"} accept={".jpeg, .png, .jpg"} multiple onChange={handleImageChange}/>
                        </div>
                        <div className={"addActivity-form3"}>
                            <button  type="submit" className="btn btn-primary form-btn">SUBMIT</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default ImageUpload;