import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LlamadoAtencionPage } from './llamado-atencion.page';

describe('LlamadoAtencionPage', () => {
  let component: LlamadoAtencionPage;
  let fixture: ComponentFixture<LlamadoAtencionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LlamadoAtencionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
