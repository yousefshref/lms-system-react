import React from 'react'
import { BiEdit, BiTrash } from 'react-icons/bi'

const AddedElement = ({ element, websiteHolder, setWebsiteHolder, is_admin }) => {
  const index = websiteHolder?.findIndex(item => item.index === element.index);

  const [data, setData] = React.useState(websiteHolder[index]?.value);


  const [textEdit, setTextEdit] = React.useState(false)
  const updateText = (e) => {
    const newValue = e.target.value;
    const updatedHolder = [...websiteHolder];
    updatedHolder[index].value = newValue;
    setData(newValue);
  }

  const [imageEdit, setImageEdit] = React.useState(false)
  const [imageWidth, setImageWidth] = React.useState(websiteHolder[index]?.width)
  const updateImage = (e) => {
    const newValue = e.target.files[0];
    const updatedHolder = [...websiteHolder];
    updatedHolder[index].value = newValue;
    setData(newValue);
  }


  const deleteElement = () => {
    const exist = websiteHolder?.find(item => item.index === element.index);
    setWebsiteHolder(prev => prev?.filter(item => item.index !== exist?.index));
    setData(null);
  }


  return (
    <div className='flex flex-col gap-4 p-2'>
      {
        element?.check === 'image' && (
          <div className='flex flex-col-reverse p-2 rounded-xl relative gap-2'>
            {
              is_admin &&
            <div className='flex gap-3'>
              <span className='text-blue-600 cursor-pointer my-auto' onClick={() => setImageEdit(!imageEdit)}>
                <BiEdit />
              </span>
              <span className='text-red-600 cursor-pointer my-auto' onClick={() => deleteElement()}>
                <BiTrash />
              </span>
            </div>
            }
            {
              typeof data === 'string' ? (
                <img style={{ width: `${imageWidth}px` }} className={`rounded-xl`} alt={element?.title} src={data} />
              ) : (
                typeof data === 'object' && data ? (
                  <img style={{ width: `${imageWidth}px` }} className={`rounded-xl`} alt={element?.title} src={URL.createObjectURL(data)} />
                ) : null
              )
            }
            {
              imageEdit ? (
                <>
                  <input type="file" onChange={(e) => { updateImage(e) }} />
                  <input placeholder='عرض الصورة مثال: 300' onChange={(e) => {
                    const newValue = e.target.value;
                    const updatedHolder = [...websiteHolder];
                    updatedHolder[index].width = newValue;
                    setImageWidth(newValue);
                  }} />
                </>
              ) : null
            }
          </div>
        )
      }
      {
        element?.check === 'text' && (
          <div className='flex p-2 rounded-xl relative gap-2'>
            {
              is_admin &&
            <div className='flex gap-3'>
              <span className='text-blue-600 cursor-pointer my-auto' onClick={() => setTextEdit(!textEdit)}>
                <BiEdit />
              </span>
              <span className='text-red-600 cursor-pointer my-auto' onClick={() => deleteElement()}>
                <BiTrash />
              </span>
            </div>
            }
            <div>
              {
                element?.check === 'text' && (
                  textEdit ? (
                    <input value={data} onChange={(e) => { updateText(e) }} />
                  ) :
                    <p>{data}</p>
                )
              }
            </div>
          </div>
        )
      }

    </div>
  )
}

export default AddedElement