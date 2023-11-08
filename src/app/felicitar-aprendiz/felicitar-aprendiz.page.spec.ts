import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FelicitarAprendizPage } from './felicitar-aprendiz.page';

describe('FelicitarAprendizPage', () => {
  let component: FelicitarAprendizPage;
  let fixture: ComponentFixture<FelicitarAprendizPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FelicitarAprendizPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
