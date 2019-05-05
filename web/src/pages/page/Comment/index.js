import {
  Comment, Avatar, Form, Button, List, Input,
} from 'antd';
import moment from 'moment';
import request from '@/utils/request';

const TextArea = Input.TextArea;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({
  onChange, onSubmit, submitting, value,
}) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

class Comments extends React.Component {
  state = {
    comments: [],
    submitting: false,
    value: '',
  }
  componentDidMount(){
    this.getComment()
  }
  getComment=()=>{
    let id =  this.props.data.page_id || this.props.data.id 
    request(`/comment/get/${id}`).then(res=>{
      console.log(res,'comments')
      const comments = res.data.map(item=>{
       return  {
          author: '游客'+moment.now(),
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content: <p>{item.content}</p>,
          datetime: moment(`2019-04-22T22:11:37.000Z`).format('MMMM Do YYYY, h:mm:ss a'),
        }
      })
     let t = {
        submitting: false,
        value: '',
        comments: comments
      }
      this.setState(t)
      console.log(t)
    })
  }
  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }
    console.log(this.props.data)
 
    request("/comment/add",{
      method:"POST",
      body:{
        "page_id":this.props.data.page_id||this.props.data.id,
        "content":this.state.value
      }
    })
    this.setState({
      submitting: true,
    });

    setTimeout(() => {
     this.getComment()
      
    }, 1000);
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }

  render() {
    const { comments, submitting, value } = this.state;

    return (
      <div>
        {comments.length > 0 && <CommentList comments={comments} />}
        <Comment
          avatar={(
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          )}
          content={(
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
            />
          )}
        />
      </div>
    );
  }
}
export default Comments;