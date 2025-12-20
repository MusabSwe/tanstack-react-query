import { Form } from "react-bootstrap"
import { PostStatusType } from "../types";

interface PostFilterProps {
    selectedPostStatus: PostStatusType;
    setSelectedPostStatus: (status: PostStatusType) => void;
}   

const PostFilter = ({ selectedPostStatus, setSelectedPostStatus }:PostFilterProps) => { 

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPostStatus(e.target.value as PostStatusType);
    };
    
    return (
        <>  
        <h5>Filter By Status</h5>
        <Form.Select value={selectedPostStatus} onChange={onChange}>
          <option value="all">Select Status</option>
          <option value="publish">Publish</option>
          <option value="draft">Draft</option>
          <option value="blocked">Blocked</option>
        </Form.Select>
        </>
    )
}

export default PostFilter;  