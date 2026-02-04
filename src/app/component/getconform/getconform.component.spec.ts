import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetconformComponent } from './getconform.component';

describe('GetconformComponent', () => {
  let component: GetconformComponent;
  let fixture: ComponentFixture<GetconformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetconformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetconformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
