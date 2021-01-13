import { Popover, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setSortType, sortToLowest, sortToHighest } from "../../redux/actions";

export default function SortButton() {
  const { tasks, sortType } = useSelector((state) => state);
  const dispatch = useDispatch();
  const sortContent = (
    <>
      <div>
        <Button
          type="link"
          onClick={() => {
            dispatch(sortToLowest(tasks, sortType));
          }}
        >
          To Lowest
        </Button>
      </div>
      <div>
        <Button
          type="link"
          onClick={() => {
            dispatch(sortToHighest(tasks, sortType));
          }}
        >
          To Highest
        </Button>
      </div>
    </>
  );
  const content = (
    <>
      <div>
        <Popover placement="rightTop" content={sortContent} trigger="click">
          <Button
            type="link"
            onClick={() => {
              dispatch(setSortType("name"));
            }}
          >
            By name
          </Button>
        </Popover>
      </div>
      <div>
        <Popover placement="rightTop" content={sortContent} trigger="click">
          <Button
            type="link"
            onClick={() => {
              dispatch(setSortType("email"));
            }}
          >
            By e-mail
          </Button>
        </Popover>
      </div>
      <div>
        <Popover placement="rightTop" content={sortContent} trigger="click">
          <Button
            type="link"
            onClick={() => {
              dispatch(setSortType("status"));
            }}
          >
            By status
          </Button>
        </Popover>
      </div>
    </>
  );
  return (
    <>
      <Popover content={content} trigger="click">
        <Button>Sort</Button>
      </Popover>
    </>
  );
}
