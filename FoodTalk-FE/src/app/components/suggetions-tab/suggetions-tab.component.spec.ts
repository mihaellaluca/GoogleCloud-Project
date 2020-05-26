import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggetionsTabComponent } from './suggetions-tab.component';

describe('SuggetionsTabComponent', () => {
  let component: SuggetionsTabComponent;
  let fixture: ComponentFixture<SuggetionsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggetionsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggetionsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
