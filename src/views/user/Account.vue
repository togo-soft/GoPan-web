<template>
    <div class="container-fluid mt-5 ">
        <div class="row">
            <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">

                <div class="card card-profile shadow">
                    <div class="card-body pt-0 pt-md-4">
                        <div class="text-center style-control">
                            <h3>
                                Jessica Jones
                            </h3>
                            <div class="h5">
                                xuthus5
                            </div>
                            <div class="h5 mt-4">
                                xuthus5@gmail.com
                            </div>
                            <div>
                                <i class="ni education_hat mr-2"></i>University of Computer Science
                            </div>
                            <hr class="my-4" />
                            <p>Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-xl-8 order-xl-1">
<!--                <b-card shadow type="secondary">-->
<!--                    <div slot="header" class="bg-white border-0">-->
<!--                        <div class="row align-items-center">-->
<!--                            <div class="col-8">-->
<!--                                <h3 class="mb-0">My account</h3>-->
<!--                            </div>-->
<!--                            <div class="col-4 text-right">-->
<!--                                <a href="#!" class="btn btn-sm btn-primary">Settings</a>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <template>-->
<!--                        <form @submit.prevent>-->
<!--                            <h6 class="heading-small text-muted mb-4">User information</h6>-->
<!--                            <div class="pl-lg-4">-->
<!--                                <div class="row">-->
<!--                                    <div class="col-lg-6">-->
<!--                                        <b-input alternative=""-->
<!--                                                    label="Username"-->
<!--                                                    placeholder="Username"-->
<!--                                                    input-classes="form-control-alternative"-->
<!--                                                    v-model="model.username"-->
<!--                                        />-->
<!--                                    </div>-->
<!--                                    <div class="col-lg-6">-->
<!--                                        <b-input alternative=""-->
<!--                                                    label="Email address"-->
<!--                                                    placeholder="jesse@example.com"-->
<!--                                                    input-classes="form-control-alternative"-->
<!--                                                    v-model="model.email"-->
<!--                                        />-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                                <div class="row">-->
<!--                                    <div class="col-lg-6">-->
<!--                                        <b-input alternative=""-->
<!--                                                    label="First name"-->
<!--                                                    placeholder="First name"-->
<!--                                                    input-classes="form-control-alternative"-->
<!--                                                    v-model="model.firstName"-->
<!--                                        />-->
<!--                                    </div>-->
<!--                                    <div class="col-lg-6">-->
<!--                                        <b-input alternative=""-->
<!--                                                    label="Last name"-->
<!--                                                    placeholder="Last name"-->
<!--                                                    input-classes="form-control-alternative"-->
<!--                                                    v-model="model.lastName"-->
<!--                                        />-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                            <hr class="my-4" />-->
<!--                            &lt;!&ndash; Address &ndash;&gt;-->
<!--                            <h6 class="heading-small text-muted mb-4">Contact information</h6>-->
<!--                            <div class="pl-lg-4">-->
<!--                                <div class="row">-->
<!--                                    <div class="col-md-12">-->
<!--                                        <b-input alternative=""-->
<!--                                                    label="Address"-->
<!--                                                    placeholder="Home Address"-->
<!--                                                    input-classes="form-control-alternative"-->
<!--                                                    v-model="model.address"-->
<!--                                        />-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                                <div class="row">-->
<!--                                    <div class="col-lg-4">-->
<!--                                        <b-input alternative=""-->
<!--                                                    label="City"-->
<!--                                                    placeholder="City"-->
<!--                                                    input-classes="form-control-alternative"-->
<!--                                                    v-model="model.city"-->
<!--                                        />-->
<!--                                    </div>-->
<!--                                    <div class="col-lg-4">-->
<!--                                        <b-input alternative=""-->
<!--                                                    label="Country"-->
<!--                                                    placeholder="Country"-->
<!--                                                    input-classes="form-control-alternative"-->
<!--                                                    v-model="model.country"-->
<!--                                        />-->
<!--                                    </div>-->
<!--                                    <div class="col-lg-4">-->
<!--                                        <b-input alternative=""-->
<!--                                                    label="Postal code"-->
<!--                                                    placeholder="Postal code"-->
<!--                                                    input-classes="form-control-alternative"-->
<!--                                                    v-model="model.zipCode"-->
<!--                                        />-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                            <hr class="my-4" />-->
<!--                            &lt;!&ndash; Description &ndash;&gt;-->
<!--                            <h6 class="heading-small text-muted mb-4">About me</h6>-->
<!--                            <div class="pl-lg-4">-->
<!--                                <div class="form-group">-->
<!--                                    <b-input alternative=""-->
<!--                                                label="About Me">-->
<!--                                        <textarea rows="4" class="form-control form-control-alternative" placeholder="A few words about you ...">A beautiful Dashboard for Bootstrap 4. It is Free and Open Source.</textarea>-->
<!--                                    </b-input>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </form>-->
<!--                    </template>-->
<!--                </b-card>-->
                <div class="card spur-card">
                    <div class="card-header">
                        <div class="spur-card-icon">
                            <i class="fas fa-chart-bar"></i>
                        </div>
                        <div class="spur-card-title"> Account Form </div>
                    </div>
                    <div class="card-body ">
                        <form>
                            <div class="form-group">
                                <label for="Username">Username</label>
                                <input type="text" class="form-control" id="Username" readonly>
                            </div>
                            <div class="form-group">
                                <label for="Nickname">Nickname</label>
                                <input type="text" class="form-control" id="Nickname" placeholder="Nickname">
                            </div>
                            <div class="form-group">
                                <label for="Email">Email address</label>
                                <input type="email" class="form-control" id="Email" placeholder="name@example.com">
                            </div>
                            <div class="form-group">
                                <label for="Phone">Phone</label>
                                <input type="text" class="form-control" id="Phone" placeholder="13888888888">
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlTextarea1">Personal statement</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'account',
        data() {
            return {
                model: {
                    username: '',
                    email: '',
                    firstName: '',
                    lastName: '',
                    address: '',
                    city: '',
                    country: '',
                    zipCode: '',
                    about: '',
                }
            }
        },
    };
</script>

<style scoped>
    .style-control {
        font-size: 1rem;
    }
    .style-control h3 {
        font-size: 1.5rem;
    }
    .style-control .h5 {
        font-weight: 300!important;
        font-size: .8125rem;
    }
</style>