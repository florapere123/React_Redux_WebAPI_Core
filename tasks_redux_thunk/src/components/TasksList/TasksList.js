import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTasks } from '../../redux'
import { Button } from 'devextreme-react'
import DataGrid, { Column,Pager, Paging ,RowDragging, Sorting} from 'devextreme-react/data-grid'
import { LoadIndicator } from 'devextreme-react/load-indicator';
import { appConfig } from '../../Config'
import './styles.css'

/** 
 * gets the list of tasks 
 * includes 3 methods:
 * 1.  onReorder - enables to reorder grid tasks
 * 2.  cellRender - renders image cell in the grid
 * 3.  createImgPath -regex to make the img path valid
 */
const TasksList = () => {
    const tasksData = useSelector((state) => state.taskList);
    const dispatch = useDispatch();


    useEffect(() => {
        getAllTasks();
    }, [])
    
    const onReorder=(e)=> {
        let visibleRows = e.component.getVisibleRows(),
          toIndex = tasksData.tasks.indexOf(visibleRows[e.toIndex].data),
          fromIndex = tasksData.tasks.indexOf(e.itemData);
    
          tasksData.tasks.splice(fromIndex, 1);
          tasksData.tasks.splice(toIndex, 0, e.itemData);
    
        e.component.refresh();
      }
    const cellRender = (data) => {
        let imageUrl =
            data && data.data ? createImgPath(data.data.ImageUrl) : '';
        return imageUrl ? (
            <img src={imageUrl} className="imgTask" alt="text" />
        ) : (
            'No image'
        )
    }
    const getAllTasks = () => {
        dispatch(fetchTasks());
    }

    const createImgPath = (serverPath) => {
        let convertedServerPath = serverPath.replace(/\\/g, '/')
        let url = `${appConfig.ROOT_PATH_SERVER}${convertedServerPath}`;

        return url;
    }
    return  tasksData.loading ? (
       <LoadIndicator id="image-indicator"  height={200} width={200} indicatorSrc="https://fc06.deviantart.net/fs71/f/2013/073/4/1/loading_circle_fully_working_by_assasinna-d5xfzgb.gif" />
    ) : tasksData.error ? (
        <h2>{tasksData.error}</h2>
    ) : (
        <div>
            <h5>Tasks List</h5>
            <div>
                {tasksData && tasksData.tasks && (

                    <>
                        <DataGrid
                            id="gridContainer"
                            dataSource={tasksData.tasks}
                            showBorders={true}
                        >
                            <Sorting mode="single"/>
                          <RowDragging
                            allowReordering={true}
                            onReorder={onReorder}
                            showDragIcons={true}
                        />
                        <Paging defaultPageSize={5} />
                        <Pager
                          showPageSizeSelector={true}
                          allowedPageSizes={[5, 10, 20]}
                          showInfo={true} />
                            <Column
                                dataField="ImageUrl"
                                width={130}
                                height={130}
                                align="center"
                                allowSorting={false}
                                cellRender={cellRender}
                            />
                            <Column
                                dataField="Description"
                                allowSorting={true}
                                max-width={300}
                                caption="Task"
                            />
                        </DataGrid>
                        <Button
                            width={120}
                            text="Load All"
                            type="default"
                            stylingMode="contained"
                            onClick={getAllTasks}
                        />
                    </>
                )}
            </div>
        </div>
    )
}

export default TasksList
