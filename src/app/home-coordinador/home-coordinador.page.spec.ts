import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeCoordinadorPage } from './home-coordinador.page';

describe('HomeCoordinadorPage', () => {
  let component: HomeCoordinadorPage;
  let fixture: ComponentFixture<HomeCoordinadorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HomeCoordinadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
