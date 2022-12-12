import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckbox } from '@angular/material/checkbox';
import {
  MatList,
  MatListItem,
  MatListItemLine,
  MatListItemMeta,
  MatListItemTitle,
} from '@angular/material/list';
import { By } from '@angular/platform-browser';
import { ITask } from 'interfaces/task';

import { TaskListContainerComponent } from './task-list-container.component';

describe('TaskListContainerComponent', () => {
  let component: TaskListContainerComponent;
  let fixture: ComponentFixture<TaskListContainerComponent>;
  const list: ITask[] = [
    {
      id: 1,
      title: 'Task List 1',
      description: null,
      isDone: false,
      timestamp: new Date(1999, 1, 1),
    },
    {
      id: 2,
      title: 'Task List 2',
      description: 'Description',
      isDone: true,
      timestamp: new Date(1999, 2, 2),
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the task title', () => {
    component.title = 'Test Task List';
    component.list = list;
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('h2'));

    expect(titleElement.nativeElement.textContent).toBe('Test Task List');
  });

  it('should list renders correctly', () => {
    component.list = list;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.directive(MatList))).toBeTruthy();
    expect(fixture.debugElement.query(By.directive(MatListItem))).toBeTruthy();

    const itemTitleList = fixture.debugElement.queryAll(
      By.directive(MatListItemTitle),
    );
    const itemDescriptionList = fixture.debugElement.queryAll(
      By.directive(MatListItemLine),
    );
    const itemDateList = fixture.debugElement
      .queryAll(By.directive(MatListItemMeta))
      .at(0);

    expect(itemTitleList.length).toBe(2);
    expect(itemTitleList[0].nativeElement.textContent).toBe('Task List 1');
    expect(itemTitleList[1].nativeElement.textContent).toBe('Task List 2');
    expect(itemDescriptionList.length).toBe(1);
    expect(itemDescriptionList[0].nativeElement.textContent).toBe(
      'Description',
    );
    expect(itemDateList?.nativeElement.textContent).toBe('Feb 1, 1999');
  });

  it('should click on checkbox and emit a value', async () => {
    spyOn(component.checkboxChange, 'emit');
    component.list = [list.at(0)!];
    fixture.detectChanges();

    const checkbox = fixture.debugElement.query(By.directive(MatCheckbox));
    expect(checkbox.componentInstance.checked).toBe(false);

    const input = checkbox.nativeElement.querySelector('input');

    input.click();

    await fixture.whenStable();

    expect(component.checkboxChange.emit).toHaveBeenCalledWith({
      checked: true,
      task: list.at(0)!,
    });
    expect(checkbox.componentInstance.checked).toBe(true);
  });
});
