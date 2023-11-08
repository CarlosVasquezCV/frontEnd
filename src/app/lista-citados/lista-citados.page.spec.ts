import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaCitadosPage } from './lista-citados.page';

describe('ListaCitadosPage', () => {
  let component: ListaCitadosPage;
  let fixture: ComponentFixture<ListaCitadosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListaCitadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
