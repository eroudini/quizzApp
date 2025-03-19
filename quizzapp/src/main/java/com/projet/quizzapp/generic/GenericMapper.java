package com.projet.quizzapp.generic;

public interface GenericMapper<D extends BaseDto,E extends BaseEntity> {

    D toDto(E entity);

    E toEntity(D dto);
}
