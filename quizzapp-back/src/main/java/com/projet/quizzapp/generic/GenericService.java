package com.projet.quizzapp.generic;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface GenericService<D extends BaseDto> {
    Page<D> findAll(Pageable pageable);

    D saveOrUpdate(D user);

    Optional<D> findById(long id);

    void deleteById(long id);
}
